package com.pinyougou.service;

import com.pinyougou.pojo.TbSeller;
import com.pinyougou.sellergoods.service.SellerService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;

/**
 * @author HJX
 * @create 2023-10-29 23:59
 */
public class UserDetailsServiceImpl implements UserDetailsService {

    private SellerService sellerService;

    public void setSellerService(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("经过了他!");
        //根据username查询数据库得到对象
        List<GrantedAuthority> authorities=new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

        TbSeller seller=sellerService.findOne(username);//根据登录名称查ID
        if (username==null){
            System.out.println("返回null");
            return null;
        }else{
            if ("1".equals(seller.getStatus())){
                System.out.println("查询到了");
            return new User(username,seller.getPassword(),authorities);
            }else{
                System.out.println("null");
                return  null;
            }
        }

    }
}
