package com.mycompany.myapp.web.rest;


import com.mycompany.myapp.domain.Board;
import com.mycompany.myapp.repository.BoardRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
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

@RestController
@RequestMapping("/api")
public class BoardResource {

    private final Logger log = LoggerFactory.getLogger(BoardResource.class);

    private static final String ENTITY_NAME = "board";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BoardRepository boardRepository;

    public BoardResource(BoardRepository boardRepository){
        this.boardRepository = boardRepository;
    }

    /* create a board */
    @PostMapping("/boards")
    public ResponseEntity<Board> createBoard(@RequestBody Board board) throws URISyntaxException {
        if(board.getId()!=null){
            throw new BadRequestAlertException("A new Board cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Board result = boardRepository.save(board);
        return ResponseEntity.created(new URI("/api/boards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /* read all boards */
    @GetMapping("/boards")
    public List<Board> getAllBoards(){
        return boardRepository.findAll();
    }

    /* read 'id' board */
    @GetMapping("/boards/{id}")
    public ResponseEntity<Board> getBoard(@PathVariable Long id){
        Optional<Board> board = boardRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(board);
    }

    /* update a board */
    @PutMapping("/boards")
    public ResponseEntity<Board> updateBook(@RequestBody Board board) throws URISyntaxException {
        if(board.getId() == null){
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Board result = boardRepository.save(board);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, board.getId().toString()))
            .body(result);
    }

    /* delete a board */
    @DeleteMapping("/boards/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long id){
        boardRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

}
