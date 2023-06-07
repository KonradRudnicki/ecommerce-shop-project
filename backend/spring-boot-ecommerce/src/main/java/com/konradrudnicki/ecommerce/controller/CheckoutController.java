package com.konradrudnicki.ecommerce.controller;

import com.konradrudnicki.ecommerce.dto.Purchase;
import com.konradrudnicki.ecommerce.dto.PurchaseResponse;
import com.konradrudnicki.ecommerce.service.CheckoutService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {

        return checkoutService.placeOrder(purchase);
    }

}
