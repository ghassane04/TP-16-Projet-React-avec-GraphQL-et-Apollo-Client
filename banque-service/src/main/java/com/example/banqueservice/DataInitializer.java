package com.example.banqueservice;

import com.example.banqueservice.entities.Compte;
import com.example.banqueservice.entities.TypeCompte;
import com.example.banqueservice.repositories.CompteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class DataInitializer implements CommandLineRunner {
    
    private final CompteRepository compteRepository;
    
    public DataInitializer(CompteRepository compteRepository) {
        this.compteRepository = compteRepository;
    }
    
    @Override
    public void run(String... args) throws Exception {
        // Création de quelques comptes de test
        compteRepository.save(new Compte(null, 1500.0, new Date(), TypeCompte.COURANT));
        compteRepository.save(new Compte(null, 3000.0, new Date(), TypeCompte.EPARGNE));
        compteRepository.save(new Compte(null, 500.0, new Date(), TypeCompte.COURANT));
        
        System.out.println("=== Données de test initialisées ===");
        compteRepository.findAll().forEach(c -> 
            System.out.println("Compte ID: " + c.getId() + ", Solde: " + c.getSolde() + ", Type: " + c.getType())
        );
    }
}
