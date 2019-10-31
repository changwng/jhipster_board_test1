package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Board3;
import com.mycompany.myapp.repository.Board3Repository;
import com.mycompany.myapp.service.dto.Board3DTO;
import com.mycompany.myapp.service.mapper.Board3Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Board3}.
 */
@Service
@Transactional
public class Board3Service {

    private final Logger log = LoggerFactory.getLogger(Board3Service.class);

    private final Board3Repository board3Repository;

    private final Board3Mapper board3Mapper;

    public Board3Service(Board3Repository board3Repository, Board3Mapper board3Mapper) {
        this.board3Repository = board3Repository;
        this.board3Mapper = board3Mapper;
    }

    /**
     * Save a board3.
     *
     * @param board3DTO the entity to save.
     * @return the persisted entity.
     */
    public Board3DTO save(Board3DTO board3DTO) {
        log.debug("Request to save Board3 : {}", board3DTO);
        Board3 board3 = board3Mapper.toEntity(board3DTO);
        board3 = board3Repository.save(board3);
        return board3Mapper.toDto(board3);
    }

    /**
     * Get all the board3S.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Board3DTO> findAll() {
        log.debug("Request to get all Board3S");
        return board3Repository.findAll().stream()
            .map(board3Mapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one board3 by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Board3DTO> findOne(Long id) {
        log.debug("Request to get Board3 : {}", id);
        return board3Repository.findById(id)
            .map(board3Mapper::toDto);
    }

    /**
     * Delete the board3 by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Board3 : {}", id);
        board3Repository.deleteById(id);
    }
}
