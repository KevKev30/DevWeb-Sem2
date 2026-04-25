<?php

namespace App\Http\Controllers;

use App\Models\Capteur;
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
        $capteur = Capteur::with(['salle.batiment'])->find($id);

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
                'type_capteur'        => $request->input('type_capteur'),
                'valeur_actuelle'     => $request->input('valeur_actuelle', 0),
                'unite_mesure'        => $request->input('unite_mesure'),
                'etat_fonctionnement' => $request->input('etat_fonctionnement', 'OK'),
                'id_salle'            => $request->input('id_salle'),
            ]);

            return response()->json(['status' => 'success', 'capteur' => $capteur], 201);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    // PUT /api/capteurs/{id}
    public function update(Request $request, $id)
    {
        try {
            $capteur = Capteur::find($id);

            if (!$capteur) {
                return response()->json(['status' => 'error', 'message' => 'Capteur non trouvé'], 404);
            }

            $capteur->fill($request->only([
                'type_capteur',
                'valeur_actuelle',
                'unite_mesure',
                'etat_fonctionnement',
                'id_salle',
            ]));

            $capteur->save();

            return response()->json(['status' => 'success', 'capteur' => $capteur]);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    // DELETE /api/capteurs/{id}
    public function destroy($id)
    {
        try {
            $capteur = Capteur::find($id);

            if (!$capteur) {
                return response()->json(['status' => 'error', 'message' => 'Capteur non trouvé'], 404);
            }

            $capteur->delete();

            return response()->json(['status' => 'success', 'message' => 'Capteur supprimé']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    // PUT /api/capteurs/{id}/etat
    // Body: { "etat": "OK" | "Panne" | "Maintenance" }
    public function changerEtat(Request $request, $id)
    {
        try {
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
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
}
