<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UtilisateurController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/connexion', [UtilisateurController::class, 'login']);
Route::post('/inscription', [UtilisateurController::class, 'register']);
Route::get('/utilisateurs', [UtilisateurController::class, 'index']);
Route::put('/profil/{id}', [UtilisateurController::class, 'updateProfil']);
Route::post('/points/{id}', [UtilisateurController::class, 'ajouterPoints']);
Route::get('/niveau/{id}', [UtilisateurController::class, 'getNiveau']);
