<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class RestoU extends Model
{
    protected $table = 'RESTO_U';
    protected $primaryKey = 'id_menu';
    public $timestamps = false;
 
    protected $fillable = [
        'date_jour',
        'entree',
        'plat_principal',
        'dessert',
        'stock_distributeur',
        'ouvert_ferme',
        'id_bat',
    ];
 
    public function batiment()
    {
        return $this->belongsTo(Batiment::class, 'id_bat');
    }
}