package com.example.demo.Wallet;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class WalletConfig {

    @Bean
    CommandLineRunner commandLineRunner(WalletRepository walletRepository){
        return args -> {
             Wallet wallet1 = new Wallet("0x15A107EB98446050d988c01bbc698a58db6C6334");
             Wallet wallet2 = new Wallet("0x25A107EB98446050d988c01bbc698a58db6C6335");
             Wallet wallet3 = new Wallet("0x35A107EB98446050d988c01bbc698a58db6C6336");

             walletRepository.saveAll(List.of(wallet1, wallet2, wallet3));
        };
    }
}
