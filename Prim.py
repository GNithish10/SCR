import networkx as nx
import matplotlib.pyplot as plt

def primlist(WList,x):
    # Initialization
    infinity = 1 + max([d for u in WList.keys() for (v,d) in WList[u]])
    (visited,distance,TreeEdges) = ({},{},[])
    for v in WList.keys():
        (visited[v],distance[v]) = (False,infinity)
    
    # Start from vertex 0, marked visited and update the distance of adjacents from 0
    visited[x] = True
    for (v,d) in WList[x]:
        distance[v] = d
    
    # Repeat the below process (number of vertices-1) times
    for i in range(1,len(WList.keys())):
        mindist = infinity
        nextv = None
        #Finding the minimum weight edge (u,v) where vertex u is visited and v is not visited 
        for u in WList.keys():
            for (v,d) in WList[u]:
                if visited[u] and (not visited[v]) and d < mindist:
                    mindist = d
                    nextv = v
                    nexte = (u,v)
        
        # Mark nextv as visited and append the nexte in MST
        visited[nextv] = True
        TreeEdges.append(nexte)
        
        # Update the distance of unvisited adjacents of nextv if smaller than current
        for (v,d) in WList[nextv]:
            if not visited[v]:
                if d < distance[v]:
                    distance[v] = d
    return(TreeEdges)

f=open("C:/Users/windows/Downloads/pipe_network_data.txt",'r')
edge_dir = eval(f.read())

dedges=[]
for i in range(len(edge_dir)):
    l=(edge_dir[i][0], edge_dir[i][1], int(edge_dir[i][2]))
    dedges.append(l)


edges = dedges + [(j,i,w) for (i,j,w) in dedges]
WL = {}
x="Null"
for (i,j,w) in dedges:
    if i not in WL.keys():
        WL[i] = []
        if x=="Null":
            x=i
    if j not in WL.keys():
        WL[j] = []
    WL[i].append((j,w))

G = nx.Graph()
for i in dedges:
    G.add_edge(i[0],i[1],weight=i[2])
elarge = [(u, v) for (u, v, d) in G.edges(data=True) if (u,v) not in primlist(WL,x)]
esmall = [(u, v) for (u, v, d) in G.edges(data=True) if (u,v) in primlist(WL,x)]

pos = nx.spring_layout(G, seed=7)  # positions for all nodes - seed for reproducibility

# nodes
nx.draw_networkx_nodes(G, pos, node_size=700)

# edges
nx.draw_networkx_edges(G, pos, edgelist=elarge, width=6)
nx.draw_networkx_edges(
    G, pos, edgelist=esmall, width=6, alpha=0.5, edge_color="b", style="dashed"
)

# node labels
nx.draw_networkx_labels(G, pos, font_size=20, font_family="sans-serif")
# edge weight labels
edge_labels = nx.get_edge_attributes(G, "weight")
nx.draw_networkx_edge_labels(G, pos, edge_labels)

ax = plt.gca()
ax.margins(0.08)
plt.axis("off")
plt.tight_layout()
plt.savefig('output.png')