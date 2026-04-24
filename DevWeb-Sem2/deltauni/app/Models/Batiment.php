<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Batiment extends Model
{
    protected $table = 'BATIMENT';
    protected $primaryKey = 'id_bat';
    public $timestamps = false;

    public function salles()
    {
        return $this->hasMany(Salle::class, 'id_bat', 'id_bat');
    }
}