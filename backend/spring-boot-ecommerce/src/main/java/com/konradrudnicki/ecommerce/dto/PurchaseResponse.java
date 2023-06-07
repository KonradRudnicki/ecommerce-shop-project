package com.konradrudnicki.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class PurchaseResponse {

    private final String orderTrackingNumber;
}
