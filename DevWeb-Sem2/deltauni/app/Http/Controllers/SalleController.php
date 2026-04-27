<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Salle;

class SalleController extends Controller
{
    public function index()
    {
        $salles = DB::table('SALLE')
            ->join('BATIMENT', 'SALLE.id_bat', '=', 'BATIMENT.id_bat')
            ->select('SALLE.*', 'BATIMENT.nom_bat', 'BATIMENT.specialite')
            ->get();

        return response()->json($salles);
    }

    public function updatePc(Request $request, $id)
    {
        DB::table('SALLE')->where('id_salle', $id)->update([
            'pc_disponibles' => $request->input('pc_disponibles')
        ]);
        return response()->json(['status' => 'success']);
    }

    public function getSalles()
    {
        $salles = Salle::with('batiment')->get();
        return response()->json($salles);
    }
}