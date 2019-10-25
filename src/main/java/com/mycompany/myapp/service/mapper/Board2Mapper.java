package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.Board2DTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Board2} and its DTO {@link Board2DTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface Board2Mapper extends EntityMapper<Board2DTO, Board2> {



    default Board2 fromId(Long id) {
        if (id == null) {
            return null;
        }
        Board2 board2 = new Board2();
        board2.setId(id);
        return board2;
    }
}
