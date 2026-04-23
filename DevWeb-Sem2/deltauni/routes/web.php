<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UtilisateurController;
use App\Models\Utilisateur;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/utilisateurs', [UtilisateurController::class, 'index']);
Route::get('/utilisateurs', [UtilisateurController::class, 'afficherVue']);
Route::post('/api/inscription', [UtilisateurController::class, 'register']);
Route::post('/api/connexion', [UtilisateurController::class, 'login']);