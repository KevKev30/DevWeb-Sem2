<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistoriqueCapteur extends Model
{
    protected $table = 'HISTORIQUE_CAPTEUR';
    protected $primaryKey = 'id_historique';
    public $timestamps = false;

    protected $fillable = ['id_capteur', 'valeur', 'date_mesure'];

    public function capteur()
    {
        return $this->belongsTo(Capteur::class, 'id_capteur', 'id_capteur');
    }
}