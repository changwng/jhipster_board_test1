package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.Board2Service;
import com.mycompany.myapp.domain.Board2;
import com.mycompany.myapp.repository.Board2Repository;
import com.mycompany.myapp.service.dto.Board2DTO;
import com.mycompany.myapp.service.mapper.Board2Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Board2}.
 */
@Service
@Transactional
public class Board2ServiceImpl implements Board2Service {

    private final Logger log = LoggerFactory.getLogger(Board2ServiceImpl.class);

    private final Board2Repository board2Repository;

    private final Board2Mapper board2Mapper;

    public Board2ServiceImpl(Board2Repository board2Repository, Board2Mapper board2Mapper) {
        this.board2Repository = board2Repository;
        this.board2Mapper = board2Mapper;
    }

    /**
     * Save a board2.
     *
     * @param board2DTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Board2DTO save(Board2DTO board2DTO) {
        log.debug("Request to save Board2 : {}", board2DTO);
        Board2 board2 = board2Mapper.toEntity(board2DTO);
        board2 = board2Repository.save(board2);
        return board2Mapper.toDto(board2);
    }

    /**
     * Get all the board2S.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Board2DTO> findAll() {
        log.debug("Request to get all Board2S");
        return board2Repository.findAll().stream()
            .map(board2Mapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one board2 by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Board2DTO> findOne(Long id) {
        log.debug("Request to get Board2 : {}", id);
        return board2Repository.findById(id)
            .map(board2Mapper::toDto);
    }

    /**
     * Delete the board2 by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Board2 : {}", id);
        board2Repository.deleteById(id);
    }
}
