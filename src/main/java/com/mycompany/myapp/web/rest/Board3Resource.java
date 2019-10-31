package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.service.Board3Service;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.service.dto.Board3DTO;
import com.mycompany.myapp.service.dto.Board3Criteria;
import com.mycompany.myapp.service.Board3QueryService;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Board3}.
 */
@RestController
@RequestMapping("/api")
public class Board3Resource {

    private final Logger log = LoggerFactory.getLogger(Board3Resource.class);

    private static final String ENTITY_NAME = "board3";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Board3Service board3Service;

    private final Board3QueryService board3QueryService;

    public Board3Resource(Board3Service board3Service, Board3QueryService board3QueryService) {
        this.board3Service = board3Service;
        this.board3QueryService = board3QueryService;
    }

    /**
     * {@code POST  /board-3-s} : Create a new board3.
     *
     * @param board3DTO the board3DTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new board3DTO, or with status {@code 400 (Bad Request)} if the board3 has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/board-3-s")
    public ResponseEntity<Board3DTO> createBoard3(@RequestBody Board3DTO board3DTO) throws URISyntaxException {
        log.debug("REST request to save Board3 : {}", board3DTO);
        if (board3DTO.getId() != null) {
            throw new BadRequestAlertException("A new board3 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Board3DTO result = board3Service.save(board3DTO);
        return ResponseEntity.created(new URI("/api/board-3-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /board-3-s} : Updates an existing board3.
     *
     * @param board3DTO the board3DTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated board3DTO,
     * or with status {@code 400 (Bad Request)} if the board3DTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the board3DTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/board-3-s")
    public ResponseEntity<Board3DTO> updateBoard3(@RequestBody Board3DTO board3DTO) throws URISyntaxException {
        log.debug("REST request to update Board3 : {}", board3DTO);
        if (board3DTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Board3DTO result = board3Service.save(board3DTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, board3DTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /board-3-s} : get all the board3S.
     *

     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of board3S in body.
     */
    @GetMapping("/board-3-s")
    public ResponseEntity<List<Board3DTO>> getAllBoard3S(Board3Criteria criteria) {
        log.debug("REST request to get Board3S by criteria: {}", criteria);
        List<Board3DTO> entityList = board3QueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
    * {@code GET  /board-3-s/count} : count all the board3S.
    *
    * @param criteria the criteria which the requested entities should match.
    * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
    */
    @GetMapping("/board-3-s/count")
    public ResponseEntity<Long> countBoard3S(Board3Criteria criteria) {
        log.debug("REST request to count Board3S by criteria: {}", criteria);
        return ResponseEntity.ok().body(board3QueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /board-3-s/:id} : get the "id" board3.
     *
     * @param id the id of the board3DTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the board3DTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/board-3-s/{id}")
    public ResponseEntity<Board3DTO> getBoard3(@PathVariable Long id) {
        log.debug("REST request to get Board3 : {}", id);
        Optional<Board3DTO> board3DTO = board3Service.findOne(id);
        return ResponseUtil.wrapOrNotFound(board3DTO);
    }

    /**
     * {@code DELETE  /board-3-s/:id} : delete the "id" board3.
     *
     * @param id the id of the board3DTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/board-3-s/{id}")
    public ResponseEntity<Void> deleteBoard3(@PathVariable Long id) {
        log.debug("REST request to delete Board3 : {}", id);
        board3Service.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
