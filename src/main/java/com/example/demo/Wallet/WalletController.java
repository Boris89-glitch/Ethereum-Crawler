package com.example.demo.Wallet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path  = "api/wallets")
public class WalletController {

   private final WalletService walletService;

   @Autowired
    public WalletController(WalletService service) {
        this.walletService = service;
    }

    @GetMapping
    public List<Wallet>getWallets(){
        return walletService.getWallets();
    }

    @PostMapping
    public void registerWallet(@RequestBody Wallet wallet){
       walletService.addWallet(wallet);
    }

    @DeleteMapping(path = "{walletId}")
    public void deleteWallet(@PathVariable("walletId") Integer walletId){
        walletService.deleteWallet(walletId);
    }
}
