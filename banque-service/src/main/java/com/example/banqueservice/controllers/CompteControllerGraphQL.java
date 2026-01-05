package com.example.banqueservice.controllers;

import com.example.banqueservice.dto.TransactionRequest;
import com.example.banqueservice.entities.Compte;
import com.example.banqueservice.entities.Transaction;
import com.example.banqueservice.entities.TypeTransaction;
import com.example.banqueservice.repositories.CompteRepository;
import com.example.banqueservice.repositories.TransactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;

@Controller
@AllArgsConstructor
public class CompteControllerGraphQL {
    
    private CompteRepository compteRepository;
    private TransactionRepository transactionRepository;
    
    // ==================== COMPTE QUERIES ====================
    
    @QueryMapping
    public List<Compte> allComptes() {
        return compteRepository.findAll();
    }
    
    @QueryMapping
    public Compte compteById(@Argument Long id) {
        Compte compte = compteRepository.findById(id).orElse(null);
        if (compte == null) {
            throw new RuntimeException(String.format("Compte %s not found", id));
        }
        return compte;
    }
    
    @QueryMapping
    public Map<String, Object> totalSolde() {
        long count = compteRepository.count();
        double sum = compteRepository.sumSoldes();
        double average = count > 0 ? sum / count : 0;
        
        return Map.of(
            "count", count,
            "sum", sum,
            "average", average
        );
    }
    
    // ==================== COMPTE MUTATIONS ====================
    
    @MutationMapping
    public Compte saveCompte(@Argument Compte compte) {
        return compteRepository.save(compte);
    }
    
    // ==================== TRANSACTION QUERIES ====================
    
    @QueryMapping
    public List<Transaction> compteTransactions(@Argument Long id) {
        Compte compte = compteRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Compte not found"));
        return transactionRepository.findByCompte(compte);
    }
    
    @QueryMapping
    public List<Transaction> allTransactions() {
        return transactionRepository.findAll();
    }
    
    @QueryMapping
    public Map<String, Object> transactionStats() {
        long count = transactionRepository.count();
        double sumDepots = transactionRepository.sumByType(TypeTransaction.DEPOT);
        double sumRetraits = transactionRepository.sumByType(TypeTransaction.RETRAIT);
        
        return Map.of(
            "count", count,
            "sumDepots", sumDepots,
            "sumRetraits", sumRetraits
        );
    }
    
    // ==================== TRANSACTION MUTATIONS ====================
    
    @MutationMapping
    public Transaction addTransaction(@Argument TransactionRequest transaction) {
        Compte compte = compteRepository.findById(transaction.getCompteId())
            .orElseThrow(() -> new RuntimeException("Compte not found"));
        
        Transaction newTransaction = new Transaction();
        newTransaction.setMontant(transaction.getMontant());
        newTransaction.setDate(transaction.getDate());
        newTransaction.setType(transaction.getType());
        newTransaction.setCompte(compte);
        
        return transactionRepository.save(newTransaction);
    }
}
