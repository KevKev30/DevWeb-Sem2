<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UtilisateurController;
use App\Http\Controllers\CapteurController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\RestoUController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/connexion', [UtilisateurController::class, 'login']);
Route::post('/inscription', [UtilisateurController::class, 'register']);
Route::get('/utilisateurs', [UtilisateurController::class, 'index']);
Route::put('/profil/{id}', [UtilisateurController::class, 'updateProfil']);
Route::post('/points/{id}', [UtilisateurController::class, 'ajouterPoints']);
Route::get('/niveau/{id}', [UtilisateurController::class, 'getNiveau']);

Route::get('/capteurs/pannes', [CapteurController::class, 'pannes']);
Route::get('/capteurs/rapport', [CapteurController::class, 'rapport']);

Route::get('/capteurs', [CapteurController::class, 'index']);
Route::post('/capteurs', [CapteurController::class, 'store']);
Route::get('/capteurs/{id}', [CapteurController::class, 'show']);
Route::put('/capteurs/{id}', [CapteurController::class, 'update']);
Route::put('/capteurs/{id}/etat', [CapteurController::class, 'changerEtat']);
Route::delete('/capteurs/{id}', [CapteurController::class, 'destroy']);

Route::get('/membres', [UtilisateurController::class, 'membres']);
Route::get('/salles', [SalleController::class, 'index']);
Route::put('/salles/{id}/pc', [SalleController::class, 'updatePc']);

Route::get('/menus', [RestoUController::class, 'index']);
Route::get('/menus/{id}', [RestoUController::class, 'show']);