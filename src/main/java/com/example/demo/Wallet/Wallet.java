package com.example.demo.Wallet;

import javax.persistence.*;

@Entity
@Table
public class Wallet {
    @Id
    @SequenceGenerator(name = "wallet_sequence", sequenceName = "wallet_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "wallet_sequence")
    private Integer id;
    private String address;

    public Wallet() {}

    public Wallet(String address) {
        this.address = address;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
