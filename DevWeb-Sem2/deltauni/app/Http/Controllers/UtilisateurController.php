<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;

class UtilisateurController extends Controller
{
    public function index()
    {
        return Utilisateur::all(); 
    }

    public function afficherVue()
    {
        $utilisateurs = Utilisateur::all();
        return view('utilisateurs', ['utilisateurs' => $utilisateurs]);
    }

    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        $user = Utilisateur::where('email', $email)->first();
        if ($user && $user->mot_de_passe === $password) {
            return response()->json([
                'status' => 'success',
                'user' => $user
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Email ou mot de passe incorrect'
        ], 401);
    }

    public function register(Request $request)
    {
        try {
            $user = new Utilisateur();
            $user->nom = $request->input('nom');
            $user->prenom = $request->input('prenom');
            $user->email = $request->input('email');
            
            $user->mot_de_passe = $request->input('password');

            if ($request->input('type') === 'etudiant') {
                $user->num_etudiant = $request->input('num_etudiant');
                $user->id_profil = 1; 
            } else {
                $user->id_profil = 4; 
            }

            $user->save();

            return response()->json(['status' => 'success', 'message' => 'Inscription réussie !']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => 'Erreur lors de l\'inscription : ' . $e->getMessage()], 500);
        }
    }
}