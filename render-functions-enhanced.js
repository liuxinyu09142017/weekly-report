/**
 * 项目管理页面 - 渲染函数增强版
 * 
 * 此代码需要替换 project-management.html 中的 renderProjects 函数
 * 位置：约第887行
 */

// 渲染项目列表（支持卡片和列表两种视图）
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    const listView = document.getElementById('projects-list');
    const emptyState = document.getElementById('empty-state');
    
    // 检查是否有项目
    if (filteredProjects.length === 0) {
        grid.style.display = 'none';
        listView.classList.remove('active');
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    // 根据当前视图模式渲染
    if (currentView === 'card') {
        renderCardView();
    } else {
        renderListView();
    }
}

// 渲染卡片视图
function renderCardView() {
    const grid = document.getElementById('projects-grid');
    grid.style.display = 'grid';
    document.getElementById('projects-list').classList.remove('active');
    
    grid.innerHTML = filteredProjects.map(project => {
        const statusClass = {
            '规划中': 'status-planning',
            '进行中': 'status-active',
            '已完成': 'status-completed',
            '已暂停': 'status-paused'
        }[project.status] || 'status-planning';
        
        // 检查是否为管理员
        const isAdmin = userData && userData.role === 'admin';
        
        return `
            <div class="project-card" onclick="viewProject('${project.id}')">
                <div class="project-header">
                    <div class="project-title">
                        <div class="project-name">${project.projectName}</div>
                        <div class="project-customer">${project.customerName}</div>
                    </div>
                    <span class="status-badge ${statusClass}">${project.status}</span>
                </div>
                
                <div class="project-meta">
                    <div class="meta-item">
                        <span class="meta-icon">🏭</span>
                        <span>${project.customerIndustry || '-'}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-icon">🌍</span>
                        <span>${project.customerCountry || '-'}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-icon">📋</span>
                        <span>${project.projectType}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-icon">👤</span>
                        <span>${project.salesPerson || '-'}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-icon">💰</span>
                        <span>${project.projectAmount ? project.projectAmount + 'K ' + project.projectCurrency : '-'}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-icon">📅</span>
                        <span>${project.startDate || '-'}</span>
                    </div>
                </div>
                
                <div class="project-stats">
                    <div class="stat-item">
                        <div class="stat-item-value">${project.totalWorkHours.toFixed(1)}</div>
                        <div class="stat-item-label">总工时</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-item-value">${project.totalSessions}</div>
                        <div class="stat-item-label">工作记录</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-item-value">${project.engineerCount}</div>
                        <div class="stat-item-label">参与人员</div>
                    </div>
                </div>
                
                <div class="project-actions" onclick="event.stopPropagation()">
                    <button class="action-btn btn-view" onclick="viewProject('${project.id}')">
                        👁️ 查看
                    </button>
                    <button class="action-btn btn-edit" onclick="editProject('${project.id}')">
                        ✏️ 编辑
                    </button>
                    ${isAdmin ? `
                    <button class="action-btn btn-delete" onclick="showDeleteModal('${project.id}', event)">
                        🗑️ 删除
                    </button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// 渲染列表视图
function renderListView() {
    const listView = document.getElementById('projects-list');
    document.getElementById('projects-grid').style.display = 'none';
    listView.classList.add('active');
    
    // 检查是否为管理员
    const isAdmin = userData && userData.role === 'admin';
    
    listView.innerHTML = filteredProjects.map(project => {
        const statusClass = {
            '规划中': 'status-planning',
            '进行中': 'status-active',
            '已完成': 'status-completed',
            '已暂停': 'status-paused'
        }[project.status] || 'status-planning';
        
        return `
            <div class="project-list-item" onclick="viewProject('${project.id}')">
                <div class="list-item-main">
                    <div class="list-item-title">${project.projectName}</div>
                    <div class="list-item-subtitle">${project.customerName}</div>
                    <div class="list-item-meta">
                        <span>🌍 ${project.customerCountry || '-'}</span>
                        <span>·</span>
                        <span>📋 ${project.projectType}</span>
                        <span>·</span>
                        <span>💰 ${project.projectAmount ? project.projectAmount + 'K ' + project.projectCurrency : '-'}</span>
                    </div>
                </div>
                
                <div class="list-item-meta">
                    <span class="meta-icon">👤</span>
                    <span>${project.salesPerson || '-'}</span>
                </div>
                
                <div class="list-item-meta">
                    <span class="status-badge ${statusClass}">${project.status}</span>
                </div>
                
                <div class="list-item-stat">
                    <div class="list-item-stat-value">${project.totalWorkHours.toFixed(1)}h</div>
                    <div class="list-item-stat-label">总工时</div>
                </div>
                
                <div class="list-item-stat">
                    <div class="list-item-stat-value">${project.engineerCount}</div>
                    <div class="list-item-stat-label">参与人员</div>
                </div>
                
                <div class="list-item-actions" onclick="event.stopPropagation()">
                    <button class="icon-btn" onclick="viewProject('${project.id}')" title="查看">
                        👁️
                    </button>
                    <button class="icon-btn" onclick="editProject('${project.id}')" title="编辑">
                        ✏️
                    </button>
                    ${isAdmin ? `
                    <button class="icon-btn delete" onclick="showDeleteModal('${project.id}', event)" title="删除">
                        🗑️
                    </button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}
