<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Salle extends Model
{
    protected $table = 'SALLE';
    protected $primaryKey = 'id_salle';
    public $timestamps = false;

    public function batiment()
    {
        return $this->belongsTo(Batiment::class, 'id_bat', 'id_bat');
    }

    public function capteurs()
    {
        return $this->hasMany(Capteur::class, 'id_salle', 'id_salle');
    }
}