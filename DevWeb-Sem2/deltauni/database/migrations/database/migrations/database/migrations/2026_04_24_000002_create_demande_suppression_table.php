<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('DEMANDE_SUPPRESSION', function (Blueprint $table) {
            $table->id('id_demande');
            $table->unsignedBigInteger('id_capteur');
            $table->unsignedBigInteger('id_user');
            $table->text('motif')->nullable();
            $table->enum('statut', ['En attente', 'Approuvée', 'Refusée'])->default('En attente');
            $table->timestamp('date_demande')->useCurrent();
            $table->foreign('id_capteur')->references('id_capteur')->on('CAPTEUR');
            $table->foreign('id_user')->references('id_user')->on('UTILISATEUR');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('DEMANDE_SUPPRESSION');
    }
};