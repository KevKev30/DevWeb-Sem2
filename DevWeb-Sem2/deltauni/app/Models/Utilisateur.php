<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Utilisateur extends Model
{
    protected $table = 'UTILISATEUR';
    protected $primaryKey = 'id_user';
    public $timestamps = false;
    protected $fillable = [
    'nom', 'prenom', 'email', 'mot_de_passe',
    'num_etudiant', 'id_profil', 'points', 'niveau'
    ];
}