<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Capteur;
use App\Models\HistoriqueCapteur;
use App\Models\DemandeSuppression;
use Illuminate\Http\Request;

class CapteurController extends Controller
{
    // GET /api/capteurs
    // Filtres : ?type=Température & ?etat=OK & ?id_salle=1
    public function index(Request $request)
    {
        $query = Capteur::with(['salle.batiment']);

        if ($request->has('type')) {
            $query->where('type_capteur', $request->input('type'));
        }

        if ($request->has('etat')) {
            $query->where('etat_fonctionnement', $request->input('etat'));
        }

        if ($request->has('id_salle')) {
            $query->where('id_salle', $request->input('id_salle'));
        }

        return response()->json($query->get());
    }

    // GET /api/capteurs/{id}
    public function show($id)
    {
        $capteur = Capteur::with(['salle.batiment', 'historique'])->find($id);

        if (!$capteur) {
            return response()->json(['status' => 'error', 'message' => 'Capteur non trouvé'], 404);
        }

        return response()->json($capteur);
    }

    // POST /api/capteurs
    public function store(Request $request)
    {
        try {
            $capteur = Capteur::create([
                'type_capteur'       => $request->input('type_capteur'),
                'valeur_actuelle'    => $request->input('valeur_actuelle', 0),
                'unite_mesure'       => $request->input('unite_mesure'),
                'etat_fonctionnement'=> $request->input('etat_fonctionnement', 'OK'),
                'id_salle'           => $request->input('id_salle'),
            ]);

            return response()->json(['status' => 'success', 'capteur' => $capteur], 201);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    // PUT /api/capteurs/{id}
    public function update(Request $request, $id)
    {
        $capteur = Capteur::find($id);

        if (!$capteur) {
            return response()->json(['status' => 'error', 'message' => 'Capteur non trouvé'], 404);
        }

        $capteur->fill($request->only([
            'type_capteur',
            'unite_mesure',
            'etat_fonctionnement',
            'id_salle'
        ]));

        // Si une nouvelle valeur est envoyée, on la logue dans l'historique
        if ($request->has('valeur_actuelle')) {
            $capteur->valeur_actuelle = $request->input('valeur_actuelle');

            HistoriqueCapteur::create([
                'id_capteur'  => $capteur->id_capteur,
                'valeur'      => $request->input('valeur_actuelle'),
                'date_mesure' => now(),
            ]);
        }

        $capteur->save();

        return response()->json(['status' => 'success', 'capteur' => $capteur]);
    }

    // PUT /api/capteurs/{id}/etat
    // Body: { "etat": "OK" | "Panne" | "Maintenance" }
    public function changerEtat(Request $request, $id)
    {
        $capteur = Capteur::find($id);

        if (!$capteur) {
            return response()->json(['status' => 'error', 'message' => 'Capteur non trouvé'], 404);
        }

        $etatsValides = ['OK', 'Panne', 'Maintenance'];
        $nouvelEtat = $request->input('etat');

        if (!in_array($nouvelEtat, $etatsValides)) {
            return response()->json(['status' => 'error', 'message' => 'État invalide'], 422);
        }

        $capteur->etat_fonctionnement = $nouvelEtat;
        $capteur->save();

        return response()->json(['status' => 'success', 'etat' => $capteur->etat_fonctionnement]);
    }

    // POST /api/capteurs/{id}/suppression
    // Body: { "id_user": 1, "motif": "..." }
    public function soliciterSuppression(Request $request, $id)
    {
        $capteur = Capteur::find($id);

        if (!$capteur) {
            return response()->json(['status' => 'error', 'message' => 'Capteur non trouvé'], 404);
        }

        $demande = DemandeSuppression::create([
            'id_capteur' => $id,
            'id_user'    => $request->input('id_user'),
            'motif'      => $request->input('motif'),
        ]);

        return response()->json(['status' => 'success', 'demande' => $demande], 201);
    }

    // GET /api/capteurs/pannes
    public function pannes()
    {
        $capteurs = Capteur::whereIn('etat_fonctionnement', ['Panne', 'Maintenance'])
                           ->with('salle.batiment')
                           ->get();

        return response()->json($capteurs);
    }

    // GET /api/capteurs/{id}/historique
    public function historique($id)
    {
        $capteur = Capteur::find($id);

        if (!$capteur) {
            return response()->json(['status' => 'error', 'message' => 'Capteur non trouvé'], 404);
        }

        $historique = HistoriqueCapteur::where('id_capteur', $id)
                        ->orderBy('date_mesure', 'desc')
                        ->get();

        return response()->json($historique);
    }

    // GET /api/capteurs/rapport
    // Retourne la dernière valeur connue de chaque capteur + stats simples
    public function rapport()
    {
        $capteurs = Capteur::with('salle.batiment')->get();

        $data = $capteurs->map(function ($capteur) {
            $dernierHistorique = HistoriqueCapteur::where('id_capteur', $capteur->id_capteur)
                ->orderBy('date_mesure', 'desc')
                ->first();

            return [
                'id_capteur'          => $capteur->id_capteur,
                'type'                => $capteur->type_capteur,
                'salle'               => $capteur->salle->num_salle ?? null,
                'batiment'            => $capteur->salle->batiment->nom_bat ?? null,
                'valeur_actuelle'     => $capteur->valeur_actuelle,
                'unite'               => $capteur->unite_mesure,
                'etat'                => $capteur->etat_fonctionnement,
                'derniere_mesure'     => $dernierHistorique?->date_mesure,
            ];
        });

        $stats = [
            'total'       => $capteurs->count(),
            'ok'          => $capteurs->where('etat_fonctionnement', 'OK')->count(),
            'en_panne'    => $capteurs->where('etat_fonctionnement', 'Panne')->count(),
            'maintenance' => $capteurs->where('etat_fonctionnement', 'Maintenance')->count(),
        ];

        return response()->json(['stats' => $stats, 'capteurs' => $data]);
    }
}