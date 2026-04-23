<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;
    protected $table = 'UTILISATEUR';

    protected $primaryKey = 'id_user';

    public $timestamps = false;

    protected $fillable = [
        'nom', 'prenom', 'email', 'mot_de_passe', 'id_profil'
    ];

    protected $hidden = [
        'mot_de_passe',
    ];
}