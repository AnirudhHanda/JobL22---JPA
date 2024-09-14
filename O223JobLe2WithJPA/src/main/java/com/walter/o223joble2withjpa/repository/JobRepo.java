package com.walter.o223joble2withjpa.repository;


import com.walter.o223joble2withjpa.model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Repository
public interface JobRepo extends JpaRepository<JobPost, Integer> {

    List<JobPost> findByPostProfileContainingIgnoreCaseOrPostDescContainingIgnoreCase(String keyword1, String keyword2);

}
