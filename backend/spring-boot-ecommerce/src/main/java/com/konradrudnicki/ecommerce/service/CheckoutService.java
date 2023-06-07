package com.konradrudnicki.ecommerce.service;

import com.konradrudnicki.ecommerce.dto.Purchase;
import com.konradrudnicki.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
