package com.walter.o223joble2withjpa.registration;

import com.walter.o223joble2withjpa.appuser.model.AppUser;
import com.walter.o223joble2withjpa.appuser.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RegistrationController {

    @Autowired
    private AppUserService appUserService;

    @PostMapping("register")
    public AppUser register(@RequestBody AppUser user) {
        return appUserService.saveUser(user);
    }
}
