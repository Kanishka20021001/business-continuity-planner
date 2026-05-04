package com.internship.tool.config;

import com.internship.entity.ContinuityPlan;
import com.internship.repository.ContinuityPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private ContinuityPlanRepository repository;

    @Override
    public void run(String... args) {

        if (repository.count() == 0) {

            repository.save(new ContinuityPlan(null, "Server Backup", "Daily backup plan", "Active"));
            repository.save(new ContinuityPlan(null, "Disaster Recovery", "DR plan", "Pending"));
            repository.save(new ContinuityPlan(null, "Network Failure", "Failover strategy", "Failed"));

            for (int i = 1; i <= 10; i++) {
                repository.save(new ContinuityPlan(
                        null,
                        "Plan " + i,
                        "Description " + i,
                        i % 2 == 0 ? "Active" : "Pending"
                ));
            }
        }
    }
}