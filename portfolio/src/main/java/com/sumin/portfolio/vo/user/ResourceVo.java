package com.sumin.portfolio.vo.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResourceVo {
	
	private int idx;
	private String authority;
	private String resourceId;
	private String resourceName;
	private String resourcePattern;
	private String resourceType;
	private Integer resourceSortOrder;
	
}
