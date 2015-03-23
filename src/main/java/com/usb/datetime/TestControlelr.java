package com.usb.datetime;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by pc on 23.03.2015.
 */

@RequestMapping(value="/test")
@Controller
public class TestControlelr {
    @RequestMapping(method=RequestMethod.GET)
    public String defaultMethod()
    {
        return "test";
    }
}
