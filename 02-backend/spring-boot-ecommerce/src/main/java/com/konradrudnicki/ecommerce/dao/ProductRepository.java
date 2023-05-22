package com.konradrudnicki.ecommerce.dao;

import com.konradrudnicki.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
