package com.walter.o223joble2withjpa.appuser.service;

import com.walter.o223joble2withjpa.appuser.dao.UserRepository;
import com.walter.o223joble2withjpa.appuser.model.AppUser;
import com.walter.o223joble2withjpa.appuser.model.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AppUserService implements UserDetailsService {

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = userRepo.findByUsername(username);

        if(user == null) {
            System.out.println("User 404");
            throw new UsernameNotFoundException("User not found");
        }

        return new UserPrincipal(user);
    }

    public AppUser saveUser(AppUser user) {
        user.setPassword(encoder.encode(user.getPassword()));

        return userRepo.save(user);
    }
}
