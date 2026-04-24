<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Capteur extends Model
{
    protected $table = 'CAPTEUR';
    protected $primaryKey = 'id_capteur';
    public $timestamps = false;

    protected $fillable = [
        'type_capteur',
        'valeur_actuelle',
        'unite_mesure',
        'etat_fonctionnement',
        'id_salle'
    ];

    public function salle()
    {
        return $this->belongsTo(Salle::class, 'id_salle', 'id_salle');
    }

    public function historique()
    {
        return $this->hasMany(HistoriqueCapteur::class, 'id_capteur', 'id_capteur');
    }
}