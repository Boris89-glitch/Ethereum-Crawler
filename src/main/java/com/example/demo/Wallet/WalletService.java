package com.example.demo.Wallet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WalletService {

    private final WalletRepository walletRepository;

    @Autowired
    public WalletService(WalletRepository walletRepository) {
        this.walletRepository = walletRepository;
    }

    List<Wallet> getWallets(){
        return walletRepository.findAll();
    }


    public void addWallet(Wallet wallet) {
        Optional<Wallet> walletByAddress = walletRepository.findByAddress(wallet.getAddress());
        if (walletByAddress.isPresent()){
            throw new IllegalStateException("Wallet already in db.");
        }
        walletRepository.save(wallet);
    }

    public void deleteWallet(Integer walletId) {
        boolean exists = walletRepository.existsById(Long.valueOf(walletId));
        if (!exists){
            throw new IllegalStateException("Wallet does not exist");
        }
        walletRepository.deleteById(Long.valueOf((walletId)));
    }
}
