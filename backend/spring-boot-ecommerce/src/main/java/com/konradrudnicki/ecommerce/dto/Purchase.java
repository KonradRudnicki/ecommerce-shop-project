package com.konradrudnicki.ecommerce.dto;

import com.konradrudnicki.ecommerce.entity.Address;
import com.konradrudnicki.ecommerce.entity.Customer;
import com.konradrudnicki.ecommerce.entity.Order;
import com.konradrudnicki.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
