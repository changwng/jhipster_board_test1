package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.Board3DTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Board3} and its DTO {@link Board3DTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface Board3Mapper extends EntityMapper<Board3DTO, Board3> {



    default Board3 fromId(Long id) {
        if (id == null) {
            return null;
        }
        Board3 board3 = new Board3();
        board3.setId(id);
        return board3;
    }
}
