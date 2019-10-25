package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Board2;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Board2 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Board2Repository extends JpaRepository<Board2, Long> {

}
