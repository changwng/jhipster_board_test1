package com.mycompany.myapp.service.dto;
import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Board2} entity.
 */
public class Board2DTO implements Serializable {

    private Long id;

    private String title;

    private String contents;

    private LocalDate createdDate;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Board2DTO board2DTO = (Board2DTO) o;
        if (board2DTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), board2DTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Board2DTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", contents='" + getContents() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            "}";
    }
}
