<?php
 
namespace App\Http\Controllers;
 
use App\Models\RestoU;
use Illuminate\Http\Request;
 
class RestoUController extends Controller
{
    // GET /api/menus
    public function index()
    {
        $menus = RestoU::with('batiment')
                    ->orderBy('date_jour', 'asc')
                    ->get();
 
        return response()->json($menus);
    }
 
    // GET /api/menus/{id}
    public function show($id)
    {
        $menu = RestoU::with('batiment')->find($id);
 
        if (!$menu) {
            return response()->json(['status' => 'error', 'message' => 'Menu non trouvé'], 404);
        }
 
        return response()->json($menu);
    }
}