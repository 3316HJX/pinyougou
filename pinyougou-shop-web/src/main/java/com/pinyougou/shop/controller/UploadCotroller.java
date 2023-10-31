package com.pinyougou.shop.controller;

import com.alibaba.fastjson.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import util.FastDFSClient;

import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

/**
 * @author HJX
 * @create 2023-10-31 1:37
 * 文件上传
 */
@RestController
public class UploadCotroller {
    @Value("${FILE_SERVER_URL}")
    private String file_server_url;

    @Autowired
    private HttpServletResponse response;

    @RequestMapping("/upload")
    public void upload(@RequestParam("imgFile") MultipartFile[] imgFile) {
        try {
            PrintWriter out = response.getWriter();
            FastDFSClient client = new FastDFSClient("classpath:config/fdfs_client.conf");

            for (MultipartFile file : imgFile) {

                //获取上传文件 的扩展名
                String fileName = file.getOriginalFilename();
                String  extName = fileName.substring(fileName.indexOf(".")+1);
                String path = client.uploadFile(file.getBytes(), extName);
                Map map = new HashMap();
                map.put("error",0);
                map.put("url",file_server_url+path);
                out.print(JSON.toJSON(map));
            }
            out.close();
        } catch (Exception e) {
        e.printStackTrace();
        }

    }
}
