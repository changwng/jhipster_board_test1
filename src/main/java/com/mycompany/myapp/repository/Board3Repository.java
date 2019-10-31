package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Board3;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Board3 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Board3Repository extends JpaRepository<Board3, Long>, JpaSpecificationExecutor<Board3> {

}
