package com.sumin.portfolio.controller;

import java.io.FileInputStream;
import java.io.InputStream;

import javax.annotation.Resource;

import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sumin.portfolio.utils.ThumbnailUtil;

@Controller
public class UtilsController {
	
	@Resource(name="fileUploadPath")
	private String upldPath;
	
	@ResponseBody
	@RequestMapping(value="/thumbs")
	public ResponseEntity<byte[]> thumbnail(String pvn) throws Exception {
		
		InputStream is = null;
		ResponseEntity<byte[]> entity = null;
		
		try {
			
			String formatName = pvn.substring(pvn.lastIndexOf(".") + 1); // 확장자
			MediaType mType = ThumbnailUtil.getMediaType(formatName);
			HttpHeaders headers = new HttpHeaders();
			is = new FileInputStream(upldPath + pvn);
			
			if(mType != null) {
				headers.setContentType(mType);
			} else {
				
				pvn = pvn.substring(pvn.indexOf("_") + 1);
				headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
				headers.add("Content-Disposition", "attachment); filename=\"" + new String(pvn.getBytes("UTF-8"), "ISO-8859-1") + "\"");
				
			}
			
			entity = new ResponseEntity<byte[]>(IOUtils.toByteArray(is), headers, HttpStatus.CREATED);
			
		} catch(Exception e) {
			
			e.printStackTrace();
			
		}
		
		return entity;
		
	}
	
}
