package com.example.demo.Wallet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path  = "api/wallets")
public class WalletController {

   private final WalletService service;

   @Autowired
    public WalletController(WalletService service) {
        this.service = service;
    }

    @GetMapping
    public List<Wallet>getWallets(){
        return service.getWallets();
    }

    @PostMapping
    public void registerWallet(@RequestBody Wallet wallet){
       service.addWallet(wallet);
    }

    @DeleteMapping(path = "{walletId}")
    public void deleteWallet(@PathVariable("walletId") Integer walletId){
        service.deleteWallet(walletId);
    }
}
