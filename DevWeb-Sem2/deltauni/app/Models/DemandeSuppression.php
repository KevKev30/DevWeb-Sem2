<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DemandeSuppression extends Model
{
    protected $table = 'DEMANDE_SUPPRESSION';
    protected $primaryKey = 'id_demande';
    public $timestamps = false;

    protected $fillable = ['id_capteur', 'id_user', 'motif', 'statut'];
}