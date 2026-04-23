<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UtilisateurController;
use App\Models\Utilisateur;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/utilisateurs', [UtilisateurController::class, 'index']);
Route::get('/utilisateurs', [UtilisateurController::class, 'afficherVue']);
Route::post('/connexion', [UtilisateurController::class, 'login']);
Route::post('/inscription', [UtilisateurController::class, 'register']);