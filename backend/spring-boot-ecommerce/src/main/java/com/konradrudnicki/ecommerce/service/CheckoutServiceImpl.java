package com.konradrudnicki.ecommerce.service;

import com.konradrudnicki.ecommerce.dao.CustomerRepository;
import com.konradrudnicki.ecommerce.dto.Purchase;
import com.konradrudnicki.ecommerce.dto.PurchaseResponse;
import com.konradrudnicki.ecommerce.entity.Customer;
import com.konradrudnicki.ecommerce.entity.Order;
import com.konradrudnicki.ecommerce.entity.OrderItem;
import jakarta.transaction.Transactional;
import org.hibernate.engine.spi.EntityUniqueKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    CustomerRepository customerRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        Order order = purchase.getOrder();

        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        Customer customer = purchase.getCustomer();
        customer.add(order);

        customerRepository.save(customer);

        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {

        return UUID.randomUUID().toString();
    }
}
