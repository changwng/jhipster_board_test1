package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.Board2DTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.Board2}.
 */
public interface Board2Service {

    /**
     * Save a board2.
     *
     * @param board2DTO the entity to save.
     * @return the persisted entity.
     */
    Board2DTO save(Board2DTO board2DTO);

    /**
     * Get all the board2S.
     *
     * @return the list of entities.
     */
    List<Board2DTO> findAll();


    /**
     * Get the "id" board2.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Board2DTO> findOne(Long id);

    /**
     * Delete the "id" board2.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
