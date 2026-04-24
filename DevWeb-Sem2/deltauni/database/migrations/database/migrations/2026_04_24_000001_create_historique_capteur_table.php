<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('HISTORIQUE_CAPTEUR', function (Blueprint $table) {
            $table->id('id_historique');
            $table->unsignedBigInteger('id_capteur');
            $table->float('valeur');
            $table->timestamp('date_mesure')->useCurrent();
            $table->foreign('id_capteur')->references('id_capteur')->on('CAPTEUR');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('HISTORIQUE_CAPTEUR');
    }
};