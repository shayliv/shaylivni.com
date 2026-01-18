"use client"

import {
  CodeBlock,
  GraphBlock,
  Callout,
  List,
  SectionHeading,
  SubHeading,
  Paragraph,
  BlogImage,
  Quote,
  Highlight,
  Divider,
} from "./mdx-components"

// Architecture article with rich MDX-like content
export function ArchitectureArticleContent() {
  return (
    <div className="prose-custom">
      <Paragraph>
        This is a short builder diary from my startup journey: a bunch of customer conversations about{" "}
        <Highlight>"architecture context"</Highlight> (and the usual incident-review pain) turned into an 
        experiment I couldn{"'"}t stop thinking about.
      </Paragraph>

      <Callout type="tip" title="Skip ahead?">
        If you{"'"}re here just for the wow effect, skip to: <a href="#wow-moment" className="text-accent underline font-bold">The wow moment: "Where is this code running?"</a>
      </Callout>

      <Quote>
        The cloud isn{"'"}t a list of resources. It{"'"}s a web of relationships.
      </Quote>

      <Paragraph>
        Kubernetes isn{"'"}t "a cluster." It{"'"}s code → image → workload → pod → node → exposure → identity.
      </Paragraph>

      <Paragraph>
        Once those relationships live in a graph, your assistants/agents can stop guessing and start answering.
      </Paragraph>

      <BlogImage 
        src="/architecture-graph-diagram.png"
        alt="Flow chart showing the code to runtime graph relationships"
        caption="The 'code → runtime' graph: from repo to running pods and permissions"
      />

      <SectionHeading>The model (one sentence)</SectionHeading>

      <Callout type="info">
        <strong>Ingest truth into a graph, then expose MCP tools that return answers + evidence.</strong>
      </Callout>

      <SectionHeading>Layer 1: baseline graph (Cartography + simple queries)</SectionHeading>

      <Paragraph>
        This is the "out of the box" win: <Highlight>Cartography</Highlight> syncs cloud resources into Neo4j 
        so you can query relationships, not inventories.
      </Paragraph>

      <SubHeading>What the baseline graph gives you:</SubHeading>

      <GraphBlock title="Graph Relationships">
{`(EC2Instance) ──MEMBER_OF_EC2_SECURITY_GROUP──> (EC2SecurityGroup)

(EC2SecurityGroup) ──INGRESS──> (EC2SecurityGroupRule {cidr: "0.0.0.0/0", port: 443})

(EC2Instance|AWSUser|AWSRole) ──STS_ASSUMEROLE_ALLOW──> (AWSRole)`}
      </GraphBlock>

      <SubHeading>MCP tools you can build on Layer 1:</SubHeading>

      <CodeBlock language="typescript" title="Layer 1 MCP Tools">
{`// "what's risky right now?"
reality_snapshot(region?: string)

// "is this reachable from the internet?"
reachability_explain(target_type: string, target_id: string)

// narrow permission checks
principal_can(principal_type, principal_id, action, resource_type?, resource_id?)

// diff STS_ASSUMEROLE_ALLOW chains between two selections
new_privilege_paths(...)

// power-user escape hatch
execute_cypher_readonly(cypher: string)`}
      </CodeBlock>

      <Divider />

      <SectionHeading>Layer 2: heavy lifting (Kubernetes + "which code runs where?")</SectionHeading>

      <Paragraph>
        Layer 1 answers "what{"'"}s exposed?" and "what can assume what?" for the cloud graph.
      </Paragraph>

      <Paragraph>
        <Highlight>Layer 2 answers the question teams actually live in:</Highlight> Where is this code running, 
        what version is live, and what can it reach?
      </Paragraph>

      <Callout type="info" title="How I built this">
        I created two lightweight services to keep the graph fresh:
        <List 
          items={[
            "A CI/CD integration that runs on every build — captures commit → image digest → registry links as artifacts flow through the pipeline",
            "A cronjob that periodically syncs live cluster state — workloads, pods, services, RBAC bindings, and network policies"
          ]}
        />
        Together they keep the "code → runtime" path current without manual effort.
      </Callout>

      <SubHeading>What to ingest (minimal set with maximum payoff):</SubHeading>

      <List 
        items={[
          "Workloads: Deployments/StatefulSets/DaemonSets/CronJobs, pod templates, labels/annotations",
          "Placement: Pods → Nodes → Cluster (and Node → cloud instance if you want)",
          "Exposure: Services, Ingress/Gateway, LoadBalancers, ports, hostnames",
          "Identity: ServiceAccounts + RBAC bindings (+ cloud identity links like IRSA/workload identity)",
          "Network intent: NetworkPolicies (or \"none exist\")",
          "Supply chain: image digests, provenance (CI run → commit), SBOM/CVE summaries",
          "Ownership: owner, service, tier, oncall (whatever you can standardize)"
        ]}
      />

      <SubHeading>The "code → runtime" graph (conceptually):</SubHeading>

      <CodeBlock language="cypher" title="Code to Runtime Graph">
{`// Source code to container image
(Repo)-[:AT_COMMIT]->(Commit)-[:BUILT_IN]->(CIRun)
(CIRun)-[:PRODUCED]->(ImageDigest)

// Image to running workload
(ImageDigest)-[:DEPLOYED_AS]->(Deployment)
(Deployment)-[:CREATES]->(Pod)-[:SCHEDULED_ON]->(Node)-[:BACKED_BY]->(EC2Instance)

// Traffic routing
(Ingress)-[:ROUTES_TO]->(Service)-[:SELECTS]->(Pod)

// Identity and permissions
(Pod)-[:RUNS_AS]->(ServiceAccount)-[:RBAC_ALLOWED]->(K8sPermission)`}
      </CodeBlock>

      <SubHeading>MCP tools that become possible in Layer 2:</SubHeading>

      <CodeBlock language="typescript" title="Layer 2 MCP Tools">
{`// commit → image digest → workloads → namespaces → clusters
where_is_this_code_running(repo: string, ref: string)

// "prod is running image sha256:… built from commit …"
what_version_is_live(service: string, env: string)

// Ingress/Gateway/LB inventory + what they route to
public_entrypoints(env?: string)

// routing chain + evidence
explain_service_exposure(service: string)

// reachable services/namespaces + identity/RBAC context
k8s_blast_radius(workload: string)

// RBAC paths to pods/exec and similar "uh oh" verbs
who_can_exec(namespace: string)

// images without provenance/SBOM, high CVEs, drift from allowed registries
supply_chain_risks(env?: string)`}
      </CodeBlock>

      <Divider />

      <SectionHeading id="wow-moment">The wow moment: "Where is this code running?"</SectionHeading>

      <Callout type="success" title="The moment it clicked">
        This is the moment it clicked for me that "architecture context" can be queryable.
      </Callout>

      <Paragraph>
        I asked Claude Code: <Highlight>"Where is this code running?"</Highlight> (and waited for it to hallucinate).
      </Paragraph>

      <Paragraph>
        <strong>Instead, it walked the graph:</strong>
      </Paragraph>

      <List 
        items={[
          "repo → CI provenance → ECR repo + image digest",
          "image digest → workloads/pods pulling it",
          "pods → exact node/host",
          "workload → egress/gateway path (how traffic leaves), with evidence you can paste into a ticket"
        ]}
      />

      <Callout type="warning" title="Real-world win">
        We found a "fixed" service that was still serving traffic from an older pod set in one cluster — 
        and had <strong>concrete pod/node evidence</strong> to clean it up fast.
      </Callout>

      <Divider />

      <SectionHeading>Want early access?</SectionHeading>

      <Paragraph>
        I{"'"}ve built a first beta and I{"'"}m opening it up to a small group of people for early feedback.
      </Paragraph>

      <Callout type="tip" title="Join the beta">
        If this resonates with the problems you{"'"}re facing, I{"'"}d love to get your input. 
        Reach out at <a href="mailto:shaylivni@outlook.com" className="text-accent underline font-bold">shaylivni@outlook.com</a> or 
        connect on <a href="https://linkedin.com/in/shay-livni" className="text-accent underline font-bold">LinkedIn</a> — 
        looking for honest, no-filter feedback on what works, what{"'"}s confusing, and what you{"'"}d actually use.
      </Callout>
    </div>
  )
}
